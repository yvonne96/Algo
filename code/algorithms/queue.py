class Queue():
	def __init__(self):
		self.items = []

	def isempty(self):
		return len(self.items) == 0 

	def enqueue(self, item):
		self.items = [item] + self.items

	def dequeue(self):
		if self.items:
			return self.items.pop(0)

	def __str__(self):
		return " ".join([str(x) for x in self.items])