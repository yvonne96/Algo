class FenwickTree:
	def __init__(self, size):
		self.tree = [0] * (size + 2)

	def total(self, i):
		i += 1
		total = 0
		while i:
			total += self.tree[i]
			i -= i & -i
		return total

	def add(self, i, n):
		i += 1
		while i < len(self.tree):
			self.tree[i] += n
			i += i & -i

