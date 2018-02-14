class Node:
	def __init__(self, data):
		self.data = data
		self.left = None
		self.right = None

class BST:
	def __init__(self):
		self.root = None

	def recur_add(self, data, current):
		if self.root == None:
			self.root = Node(data)
			return
		print(current.data)
		if data < current.data:
			if current.left:
				self.recur_add(data, current.left)
			else:
				current.left = Node(data)
		elif current.right:
			self.recur_add(data, current.right)
		else:
			current.right = Node(data)

	def add(self, data):
		self.recur_add(data, self.root)

