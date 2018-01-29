def bubble_sort(l):
	swapped = True
	while swapped:
		swapped = False
		for i in range(len(l) - 1):
			if l[i] > l[i+1]:
				l[i], l[i+1] = l[i+1], l[i]
				swapped = True
	return l
