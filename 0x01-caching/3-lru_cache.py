#!/usr/bin/env python3
"""This module has class LRUCache"""

from collections import OrderedDict

BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """LRU caching system"""
    def __init__(self):
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Add item to cache"""
        if key is None or item is None:
            return
        if key not in self.cache_data:
            """Adding a new key"""
            if len(self.cache_data) == BaseCaching.MAX_ITEMS:
                removed_item = self.cache_data.popitem(last=False)
                print('DISCARD ' + removed_item[0])
            self.cache_data[key] = item
        else:
            """Key exists, just replace and move to end"""
            self.cache_data.move_to_end(key)
            self.cache_data[key] = item

    def get(self, key):
        """Return value from cache"""
        if key in self.cache_data:
            self.cache_data.move_to_end(key)
            return self.cache_data[key]
        return None
