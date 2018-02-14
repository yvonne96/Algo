class Stack:
	def __init__(self):
		self.items = []

	def isempty(self):
		return len(self.items) == 0 

	def push(self, item):
		self.items.append(item)

	def pop(self):
		if self.items:
			return self.items.pop()

	def __str__(self):
		return " ".join([str(x) for x in self.items])