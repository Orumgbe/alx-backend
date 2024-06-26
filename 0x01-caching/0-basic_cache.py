#!/usr/bin/env python3
"""This module has class BasicCache"""

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """Basic caching system"""
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """Add item to dictionary"""
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """Return value from cache"""
        if not key or key is None:
            return None
        return self.cache_data.get(key)
