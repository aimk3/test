matrix = [[i * 4 + j + 1 for j in range(4)] for i in range(4)]
transposed = [[row[i] for row in matrix] for i in range(4)]

print("원본 행렬:")
for row in matrix:
    print(f"  {row}")

print("전치 행렬:")
for row in transposed:
    print(f"  {row}")
