import random

quicksort = lambda lst: (
    [] if not lst else
    quicksort([x for x in lst[1:] if x <= lst[0]])
    + [lst[0]]
    + quicksort([x for x in lst[1:] if x > lst[0]])
)

sample = random.sample(range(50), 10)
print(f"입력: {sample}")
print(f"결과: {quicksort(sample)}")
