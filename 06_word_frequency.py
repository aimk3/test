from collections import Counter

sentence = "the quick brown fox jumps over the lazy dog"
freq = Counter(sentence.split())
top5 = dict(sorted(freq.items(), key=lambda x: -x[1])[:5])
print(f"단어 빈도 Top5: {top5}")
