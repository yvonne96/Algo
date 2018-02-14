import unittest, sys
from code.algorithms.queue import Queue

class TestQueue(unittest.TestCase):

	def test_empty_queue(self):
		l = Queue()
		self.assertEqual(l.items, [])

	def test_standard_input(self):
		l = Queue()
		l.enqueue(1)
		l.enqueue(2)
		l.enqueue(3)
		l.enqueue(4)
		self.assertEqual(l.items[0], 4)
		self.assertEqual(l.items[-1], 1)

	def test_removing_items(self):
		l = Queue()
		l.enqueue(1)
		l.enqueue(2)
		l.enqueue(3)
		l.enqueue(4)
		l.dequeue()
		l.dequeue()
		self.assertEqual(l.items[0], 4)
		self.assertEqual(l.items[-1], 3)

if __name__ == "__main__":
	unittest.main()