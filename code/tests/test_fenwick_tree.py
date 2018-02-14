import unittest, sys
from code.algorithms.fenwick_tree import FenwickTree

class TestQueue(unittest.TestCase):

	def test_empty_tree(self):
		 t = FenwickTree(0)
		 self.assertEqual(t.total(0), 0)

	def test_standard_input(self):
		t = FenwickTree(10)
		t.add(0, 1)
		t.add(3, 4)
		t.add(6, 9)
		self.assertEqual(t.total(6), 14)
		self.assertEqual(t.total(2), 1)
		self.assertEqual(t.total(5), 5)
		self.assertEqual(t.total(9), 14)

if __name__ == "__main__":
	unittest.main()