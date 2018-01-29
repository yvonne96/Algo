import unittest, sys
from code.algorithms.sorting.bubble_sort import bubble_sort

class TestMergeSort(unittest.TestCase):

	def test_empty_array(self):
		self.assertEqual(bubble_sort([]), [])

	def test_in_order_array(self):
		self.assertEqual(bubble_sort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

	def test_reversed_array(self):
		self.assertEqual(bubble_sort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

	def test_standard_array(self):
		self.assertEqual(bubble_sort([1, 3, 5, 7, 9, 2, 4, 6, 8, 10]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

if __name__ == "__main__":
	unittest.main()