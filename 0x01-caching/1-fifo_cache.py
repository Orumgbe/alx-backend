#!/usr/bin/env python3
"""This module has class FIFOCache"""

BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """FIFO caching system"""
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """Add item to cache"""
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key = next(iter(self.cache_data))
            self.cache_data.pop(first_key, None)
            print('DISCARD ' + first_key)

    def get(self, key):
        """Return value from cache"""
        if not key or key is None:
            return None
        return self.cache_data.get(key)
