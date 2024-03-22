#!/usr/bin/env python3
"""This module holds the index_range method"""

from typing import Tuple

def index_range(page : int, page_size : int) -> Tuple:
    """
        Takes two integer args
        Returns a tuple of start and end index    
        for the particular pagination parameters
    """
    end = page * page_size
    start = end - page_size
    return (start, end)