from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fibs = [fib(i) for i in range(15)]
print(f"피보나치 수열: {fibs}")
