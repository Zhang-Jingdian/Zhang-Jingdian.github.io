``` python
def prune_leaves(t, vals):

"""Return a modified copy of t with all leaves that have a label

that appears in vals removed. Return None if the entire tree is

pruned away.

  

>>> t = tree(2)

>>> print(prune_leaves(t, (1, 2)))

None

>>> numbers = tree(1, [tree(2), tree(3, [tree(4), tree(5)]), tree(6, [tree(7)])])

>>> print_tree(numbers)

1

2

3

4

5

6

7

>>> print_tree(prune_leaves(numbers, (3, 4, 6, 7)))

1

2

3

5

6

"""

"*** YOUR CODE HERE ***"

if is_leaf(t) and label(t) in vals:

return None

  

new_branches = []

for b in branches(t):

pruned = prune_leaves(b, vals)

if pruned is not None:

new_branches.append(pruned)

  

return tree(label(t), new_branches)
```

```python
def buy(fruits_to_buy, prices, total_amount):

"""Print ways to buy some of each fruit so that the sum of prices is amount.

  

>>> prices = {'oranges': 4, 'apples': 3, 'bananas': 2, 'kiwis': 9}

>>> buy(['apples', 'oranges', 'bananas'], prices, 12) # We can only buy apple, orange, and banana, but not kiwi

[2 apples][1 orange][1 banana]

>>> buy(['apples', 'oranges', 'bananas'], prices, 16)

[2 apples][1 orange][3 bananas]

[2 apples][2 oranges][1 banana]

>>> buy(['apples', 'kiwis'], prices, 36)

[3 apples][3 kiwis]

[6 apples][2 kiwis]

[9 apples][1 kiwi]

"""

def add(fruits, amount, cart):

if fruits == [] and amount == 0:

print(cart)

elif fruits and amount > 0:

fruit = fruits[0]

price = prices[fruit]

for k in range(1, amount // price + 1):

# Hint: The display function will help you add fruit to the cart.

add(fruits[1:], amount - k * price , cart + f'[{k} {fruit}]')

add(fruits_to_buy, total_amount, '')
```