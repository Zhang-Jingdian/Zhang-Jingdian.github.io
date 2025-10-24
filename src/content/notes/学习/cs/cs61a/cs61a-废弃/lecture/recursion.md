递归我觉得最重要的就是返回点
返回直接把返回值替代function

```python
def interleaved_sum(n, f_odd, f_even):

"""Compute the sum f_odd(1) + f_even(2) + f_odd(3) + ..., up

to n.

  

>>> identity = lambda x: x

>>> square = lambda x: x * x

>>> triple = lambda x: x * 3

>>> interleaved_sum(5, identity, square) # 1 + 2*2 + 3 + 4*4 + 5

29

>>> interleaved_sum(5, square, identity) # 1*1 + 2 + 3*3 + 4 + 5*5

41

>>> interleaved_sum(4, triple, square) # 1*3 + 2*2 + 3*3 + 4*4

32

>>> interleaved_sum(4, square, triple) # 1*1 + 2*3 + 3*3 + 4*3

28

>>> from construct_check import check

>>> check(SOURCE_FILE, 'interleaved_sum', ['While', 'For', 'Mod']) # ban loops and %

True

>>> check(SOURCE_FILE, 'interleaved_sum', ['BitAnd', 'BitOr', 'BitXor']) # ban bitwise operators, don't worry about these if you don't know what they are

True

"""

"*** YOUR CODE HERE ***"

def sum_from(k):

if k > n:

return 0

elif k == n:

return f_odd(k)

else:

return f_odd(k) + f_even(k + 1) + sum_from(k + 2)

return sum_from(1)
```


```python 
def next_smaller_dollar(bill):

"""Returns the next smaller bill in order."""

if bill == 100:

return 50

if bill == 50:

return 20

if bill == 20:

return 10

elif bill == 10:

return 5

elif bill == 5:

return 1

  

def count_dollars(total):

"""Return the number of ways to make change.

  

>>> count_dollars(15) # 15 $1 bills, 10 $1 & 1 $5 bills, ... 1 $5 & 1 $10 bills

6

>>> count_dollars(10) # 10 $1 bills, 5 $1 & 1 $5 bills, 2 $5 bills, 10 $1 bills

4

>>> count_dollars(20) # 20 $1 bills, 15 $1 & $5 bills, ... 1 $20 bill

10

>>> count_dollars(45) # How many ways to make change for 45 dollars?

44

>>> count_dollars(100) # How many ways to make change for 100 dollars?

344

>>> count_dollars(200) # How many ways to make change for 200 dollars?

3274

>>> from construct_check import check

>>> # ban iteration

>>> check(SOURCE_FILE, 'count_dollars', ['While', 'For'])

True

"""

"*** YOUR CODE HERE ***"

def constrained_count(amount, bill):

if amount == 0:

return 1

if amount < 0 or bill is None:

return 0

without = constrained_count(amount, next_smaller_dollar(bill))

with_one = constrained_count(amount - bill, bill)

return without + with_one

  

return constrained_count(total, 100)
```

```python
def shuffle(s):

"""Return a shuffled list that interleaves the two halves of s.

  

>>> shuffle(range(6))

[0, 3, 1, 4, 2, 5]

>>> letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

>>> shuffle(letters)

['a', 'e', 'b', 'f', 'c', 'g', 'd', 'h']

>>> shuffle(shuffle(letters))

['a', 'c', 'e', 'g', 'b', 'd', 'f', 'h']

>>> letters # Original list should not be modified

['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

"""

assert len(s) % 2 == 0, 'len(seq) must be even'

"*** YOUR CODE HERE ***"

def interleave(a, b):

if not a:

return list(b)

return [a[0], b[0]] + interleave(a[1:], b[1:])

  

mid = len(s) // 2

return interleave(s[:mid], s[mid:])
```

```python
def merge(s, t):

"""Merges two sorted lists.

  

>>> s1 = [1, 3, 5]

>>> s2 = [2, 4, 6]

>>> merge(s1, s2)

[1, 2, 3, 4, 5, 6]

>>> s1

[1, 3, 5]

>>> s2

[2, 4, 6]

>>> merge([], [2, 4, 6])

[2, 4, 6]

>>> merge([1, 2, 3], [])

[1, 2, 3]

>>> merge([5, 7], [2, 4, 6])

[2, 4, 5, 6, 7]

>>> merge([2, 3, 4], [2, 4, 6])

[2, 2, 3, 4, 4, 6]

>>> from construct_check import check

>>> check(SOURCE_FILE, 'merge', ['While', 'For']) # ban iteration

True

"""

"*** YOUR CODE HERE ***"

if not s:

return list(t)

if not t:

return list(s)

if s[0] < t[0]:

return [s[0]] + merge(s[1:], t)

else:

return [t[0]] + merge(s, t[1:])
```

```python
def minimum_mewtations(typed, source, limit):

"""A diff function for autocorrect that computes the edit distance from TYPED to SOURCE.

This function takes in a string TYPED, a string SOURCE, and a number LIMIT.

  

Arguments:

typed: a starting word

source: a string representing a desired goal word

limit: a number representing an upper bound on the number of edits

  

>>> big_limit = 10

>>> minimum_mewtations("cats", "scat", big_limit) # cats -> scats -> scat

2

>>> minimum_mewtations("purng", "purring", big_limit) # purng -> purrng -> purring

2

>>> minimum_mewtations("ckiteus", "kittens", big_limit) # ckiteus -> kiteus -> kitteus -> kittens

3

"""

if limit < 0:

return float('inf')

if not typed or not source:

return len(typed) + len(source)

  

if typed[0] == source[0]:

return minimum_mewtations(typed[1:], source[1:], limit)

add_cost = 1 + minimum_mewtations(typed, source[1:], limit - 1)

remove_cost = 1 + minimum_mewtations(typed[1:], source, limit - 1)

sub_cost = 1 + minimum_mewtations(typed[1:], source[1:], limit - 1)

  

return min(add_cost, remove_cost, sub_cost)
```