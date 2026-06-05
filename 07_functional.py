from functools import reduce

nums = range(1, 11)
result = reduce(
    lambda acc, x: acc + x,
    filter(lambda x: x % 2 == 0,
    map(lambda x: x ** 2, nums))
)
print(f"1~10 짝수 제곱합: {result}")
