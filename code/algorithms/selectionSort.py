def selectionSort(l):
	for i in range(len(l)):
		min_found = i 
		for j in range(i+1, len(l)):
			if l[j] < l[i]:
				min_found = j
		l[min_found], l[i] = l[i], l[min_found]
	return l