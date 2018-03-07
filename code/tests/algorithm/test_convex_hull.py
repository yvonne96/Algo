import unittest, sys
from code.algorithms.convexhull import convexhull

class TestInsertionSort(unittest.TestCase):

	def test_in_order(self):
		self.assertEqual(convexhull([[0, 0], [10, 0], [0, 10]]), [[10, 0], [0, 10], [0, 0]])

	def test_convex_hull(self):
		self.assertEqual(convexhull([[41, -6], [-24, -74], [-51, -6], [73, 17], [-30, -34]]), [[-24, -74], [73, 17], [-51, -6]])

	def test_duplicate(self):
		self.assertEqual(convexhull([[50, 50], [50, 50]]), [[50, 50]])

if __name__ == "__main__":
	unittest.main()