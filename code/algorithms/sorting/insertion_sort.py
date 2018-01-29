def insertion_sort(l):
	for i in range(len(l)):
		tmp = l[i]
		curr = i - 1
		while 0 <= curr and l[curr] > tmp:
			l[curr + 1] = l[curr]
			curr -= 1
		l[curr + 1] = tmp
	return l
