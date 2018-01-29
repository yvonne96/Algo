class Node:
	def __init__(self, data):
		self.data = data
		self.next = None

class LinkedList:
	def __init__(self):
		self.head = None

	def add(self, data):
		tmp = Node(data)
		tmp.next = self.head
		self.head = tmp

	def contains(self, data):
		current = self.head
		while current != None:
			if current.data == data:
				return True
			current = current.next
		return False

	def remove(self, data):
		if not self.contains(data):
			return

		current = self.head
		if current.data == data:
			self.head = self.head.next
			return

		while current.next.data != data:
			current = current.next
		current.next = current.next.next

	def __str__(self):
		s = ""
		current = self.head
		while current != None:
			s += " " + str(current.data)
			current = current.next
		return s.strip()


