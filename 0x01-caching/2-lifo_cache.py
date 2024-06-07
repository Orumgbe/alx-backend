#!/usr/bin/env python3
"""This module has class LIFOCache"""

BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """LIFO caching system"""
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """Add item to cache"""
        if key is None or item is None:
            return
        if key not in self.cache_data:
            """Adding a new key"""
            if len(self.cache_data) == BaseCaching.MAX_ITEMS:
                removed_item = self.cache_data.popitem()
                print('DISCARD ' + removed_item[0])
            self.cache_data[key] = item
        else:
            """Key exists, just replace"""
            del self.cache_data[key]
            self.cache_data[key] = item

    def get(self, key):
        """Return value from cache"""
        if not key or key is None:
            return None
        return self.cache_data.get(key)
