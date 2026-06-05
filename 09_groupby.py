from itertools import groupby

seq = [1, 1, 2, 2, 2, 3, 1, 1, 4, 4]
grouped = [(k, list(g)) for k, g in groupby(seq)]
print(f"연속 그루핑: {grouped}")
