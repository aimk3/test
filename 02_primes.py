is_prime = lambda n: n > 1 and all(n % i for i in range(2, int(n**0.5) + 1))
primes = list(filter(is_prime, range(2, 80)))
print(f"80 이하 소수: {primes}")
