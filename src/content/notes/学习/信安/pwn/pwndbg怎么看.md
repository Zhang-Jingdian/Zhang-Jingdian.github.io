# 总体思路（3 步法）

1. **先看上下文（context）**：知道 CPU 状态、下一条指令、栈/堆/代码区域长什么样。
    
2. **下断点 + 触发输入**：把断点放在关键处（输入返回点、函数入口/出口、ret 前）。
    
3. **逐步执行并比较“前 / 后”变化**：每次 `ni` / `si` 都看这些关键字段是否改了。
    

---

# pwndbg / gdb 输出模块一览（你最该知道的）

（按重要性排序，调试时按序查看）

1. **REGISTERS（寄存器）**
    
    - 看点：`RIP`（下一条要执行的指令）、`RSP`/`RBP`（栈指针/帧指针）、`RDI`/`RSI`（第1/2个参数）、`RAX`（返回值/临时）。
        
    - 为何重要：寄存器决定流程、传参、返回地址的位置。`ni` 后 `RIP` 一定会变化；写指令会改寄存器值。
        
2. **DISASM（反汇编） / CURRENT INSN**
    
    - 看点：当前 `RIP` 的指令和附近代码（`context` 会显示）。
        
    - 为何重要：知道执行流接下来会做什么（比如 `call`、`ret`、`mov [rsp], rax`）。`ni` 后会跳到下一条指令或返回。
        
3. **STACK（栈快照） / x/...**
    
    - 看点：栈上保存的返回地址、局部缓冲区（填充）、保存的寄存器。
        
    - 为何重要：缓冲区溢出就是在这里覆盖返回地址。`ni` 后如果执行 `ret`，会把栈上的值弹到 `RIP`。
        
4. **BACKTRACE（bt）**
    
    - 看点：函数调用链（谁调用了谁）。
        
    - 为何重要：确认程序怎么来到当前点（例如 `main -> vuln -> read`）。
        
5. **HEAP / VMMAP / MEMORY**
    
    - 看点：动态分配区域、可读写执行权限、地址布局（判断 ASLR/PIE/NX）。
        
    - 为何重要：判断能否执行 shellcode、地址是否随机化。
        
6. **LEGEND / CONTEXT（pwndbg 的可视化）**
    
    - 看点：颜色化提示（STACK | HEAP | CODE | DATA），`context` 可以定制要显示哪些部分（寄存器/反汇编/栈/源码）。
        
    - 为何重要：把关键信息一次性显示出来，减少切换。
        

---

# 常用命令速查（实战必备）

- `context`：显示当前寄存器 + 反汇编 + 栈（pwndbg）。
    
- `display/i $rip`：每次 step 自动显示当前指令。
    
- `display/x/32bx $rsp`：每次 step 自动显示栈上 32 字节（字节格式）。
    
- `x/64gx $rsp`：查看栈上 64 个 8-byte words（返回地址通常在这里）。
    
- `x/s <addr>`：把地址按字符串显示（检查 `"/bin/sh"` 等）。
    
- `x/64xb <addr>`：按字节查看内存（看填充 `0x61` = 'a'）。
    
- `b <func|addr>`：下断点。`r` 重新运行。`c` 继续。
    
- `ni`：执行**下一条汇编指令**（不进入 call）。
    
- `si`：执行**单步进入**（进入 call）。
    
- `finish`：跑到当前函数返回。
    
- `bt`：回溯栈。
    
- `vmmap`（pwndbg）：查看内存映射（了解 NX/可执行属性）。
    
- `telescope $rsp`（pwndbg）：更友好地查看栈（ASCII / words）。
    

---

# `ni` 会改变/要观察的具体点（每次 `ni` 都看这些）

1. **RIP**：会移动到下一条指令（或跳到函数内/外，取决于指令）。
    
2. **寄存器（RAX/RDI/RSI/...）**：如果执行 `mov`/`add`/`xor` 等会改寄存器。
    
3. **RSP / 内存（栈）**：执行 `push`/`pop` 或函数调用/返回会改 `RSP`；写指令会改内存。
    
4. **内存（缓冲区）**：如果执行 `mov [rsp+...], rax` 等，内存会被写。用 `display` 自动刷新感知变化。
    
5. **条件标志 / 分支**：执行 `cmp` 后跳转条件可能改变下一步流向（检查 EFLAGS）。
    

简单规则：每次 `ni`，先看 `RIP`（哪里要去），再看 `RSP`（栈变化），再看可能被写的内存（返回地址/缓冲区）。

---

# 实战示例流程（以你现有场景为例，步骤化）

1. 在程序读输入前或 `main` 开始处下断点：`b main`，`r`。
    
2. 当程序到达输入点（`read`/`fgets` 等）前，做两项 display：
    
    - `display/i $rip`
        
    - `display/x/48bx $rsp` （显示栈前 48 字节）
        
3. 发送你的 payload（例如一堆 `a` + 想写入的地址）。
    
4. 程序被 `read` 读完后会返回 `main`，`display` 会自动显示**执行到的下一条指令**与**栈变化**。
    
5. 用 `ni` 逐条执行直到 `ret` 前（注意 `call`/`ret`）：每次看 `RIP` 是否变为 `backdoor` 地址；若 `ret` 后 `RIP` 指向 `backdoor`，说明返回地址被覆盖。
    
6. 若想定位偏移：在触发崩溃后，查看栈上被写的“坏地址”（比如 `x/g $rsp`），把它交给 `pattern_find`（pwntools）或 `cyclic_find` 来得到偏移。
    

---

# 常见你会遇到的情形与如何判断（快速诊断）

- 看到栈上 `0x4011bd`（backdoor）并且 `x/s 0x402004` 是 `"/bin/sh"`：说明已劫持返回，几乎是成功拿 shell 的前兆。
    
- `RIP` 在 libc 的 `read+17`：说明当前正在内核/库函数内等待或刚返回（正如你输出）。继续 `ni` 看 `ret`。
    
- 栈里出现大段 `0x61`（'a'）：说明 payload 往栈写入填充数据。找位置确认是否覆盖到保存的 `RIP`。
    
- 若有 canary 检查（如果 binary 开启 stack protector），可以用 `canary` 命令（pwndbg）查看栈保护值是否被破坏。
    

---

# 小技巧（让调试更省力）

- `display /i $rip` + `display /x $rsp`：自动显示，省得每步手动 `x/`。
    
- `set logging on`：记录会话供回溯（不常用也不错）。
    
- `telescope $rsp`：友好查看栈的 ASCII/地址视图。
    
- 如果怀疑 ASLR，`show disable-randomization` / `set disable-randomization off`（本地测试时可以关）。
    
- 用 pwntools 的 `process()` + `gdb.attach()` 自动化复现崩溃/断点。
    

---

# 举个超简化的“前后对比”例子（伪数据，说明意图）

- **断点前**（`display` 输出）
    
    - `RIP = 0x401090`（在 main）
        
    - `RSP = 0x7ffce129a1a8`
        
    - Stack bytes at `$rsp`: `[.., 0x61,0x61,0x61, ... , 0x00, 0x00, 0x00]`
        
- **执行 `ni` 到 `ret`**
    
    - `RIP` 变为 `0x4011bd`（backdoor） ← 这说明 `ret` 弹出的值来自栈，已被覆盖！
        
    - Stack 内容仍然是 `0x61`…（payload 在那儿）
        
    - 结论：返回地址被 payload 覆盖，程序跳到 backdoor。
        
