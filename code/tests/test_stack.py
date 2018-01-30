import unittest, sys
from code.algorithms.stack import Stack

class TestStack(unittest.TestCase):

	def test_empty_stack(self):
		l = Stack()
		self.assertEqual(l.items, [])

	def test_standard_input(self):
		l = Stack()
		l.push(1)
		l.push(2)
		l.push(3)
		l.push(4)
		self.assertEqual(l.items[0], 1)
		self.assertEqual(l.items[-1], 4)

	def test_removing_items(self):
		l = Stack()
		l.push(1)
		l.push(2)
		l.push(3)
		l.push(4)
		l.pop()
		l.pop()
		self.assertEqual(l.items[0], 1)
		self.assertEqual(l.items[-1], 2)

if __name__ == "__main__":
	unittest.main()