import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const EnglishbibleBooks = {
  "Genesis": [50, [
    31, 25, 24, 26, 32, 22, 24, 22, 29, 32,
    32, 20, 18, 24, 21, 16, 27, 33, 38, 18,
    34, 24, 20, 67, 34, 35, 46, 22, 35, 43,
    55, 32, 20, 31, 29, 43, 36, 30, 23, 23,
    57, 38, 34, 34, 28, 34, 31, 22, 33, 26
  ]],
  "Exodus": [40, [
    22, 25, 22, 31, 23, 30, 25, 32, 35, 29,
    10, 51, 22, 31, 27, 36, 16, 27, 25, 26,
    36, 31, 33, 18, 40, 37, 21, 43, 46, 38,
    18, 35, 23, 35, 35, 38, 29, 31, 43, 38
  ]],
  "Leviticus": [27, [
    17, 16, 17, 35, 26, 23, 38, 36, 24, 20,
    47, 8, 59, 57, 33, 34, 16, 30, 37, 27,
    24, 33, 44, 23, 55, 46, 34
  ]],
  "Numbers": [36, [
    54, 34, 51, 49, 31, 27, 89, 26, 23, 36,
    35, 16, 33, 45, 41, 50, 13, 32, 22, 29,
    35, 41, 30, 25, 18, 65, 23, 31, 39, 17,
    54, 42, 56, 29, 34, 13
  ]],
  "Deuteronomy": [34, [
    46, 37, 29, 49, 33, 25, 26, 20, 29, 22,
    32, 32, 18, 29, 23, 22, 20, 22, 21, 20,
    23, 30, 25, 22, 19, 19, 26, 68, 29, 20,
    30, 52, 29, 12
  ]],
  "Joshua": [24, [
    18, 24, 17, 24, 15, 27, 26, 35, 27, 43,
    23, 24, 33, 15, 63, 10, 18, 28, 51, 9,
    45, 34, 16, 33
  ]],
  "Judges": [21, [
    36, 23, 31, 24, 31, 40, 25, 35, 57, 18,
    40, 15, 25, 20, 20, 31, 13, 31, 30, 48,
    25
  ]],
  "Ruth": [4, [
    22, 23, 18, 22
  ]],
  "1 Samuel": [31, [
    28, 36, 21, 22, 12, 21, 17, 22, 27, 27,
    15, 25, 23, 52, 35, 23, 58, 30, 24, 42,
    16, 23, 28, 23, 44, 25, 12, 25, 11, 31,
    13
  ]],
  "2 Samuel": [24, [
    27, 32, 39, 12, 25, 23, 29, 18, 13, 19,
    27, 31, 39, 33, 37, 23, 29, 33, 43, 26,
    22, 51, 39, 25
  ]],
  "1 Kings": [22, [
    53, 46, 28, 34, 18, 38, 51, 66, 28, 29,
    43, 33, 34, 31, 34, 34, 24, 46, 21, 43,
    29, 54
  ]],
  "2 Kings": [25, [
    18, 25, 27, 44, 27, 33, 20, 29, 37, 36,
    21, 21, 25, 29, 38, 20, 41, 37, 37, 21,
    26, 20, 37, 20, 30
  ]],
  "1 Chronicles": [29, [
    54, 55, 24, 43, 41, 66, 40, 40, 44, 14,
    47, 40, 14, 17, 29, 43, 27, 17, 19, 8,
    30, 19, 32, 31, 31, 32, 34, 21, 30
  ]],
  "2 Chronicles": [36, [
    17, 18, 17, 22, 14, 42, 22, 18, 31, 19,
    23, 16, 22, 15, 19, 14, 19, 34, 11, 37,
    20, 12, 21, 27, 28, 23, 9, 27, 36, 27,
    21, 33, 25, 31, 27, 23
  ]],
  "Ezra": [10, [
    11, 70, 13, 24, 17, 22, 28, 36, 15, 44
  ]],
  "Nehemiah": [13, [
    11, 20, 32, 23, 19, 19, 73, 18, 38, 39,
    36, 47, 31
  ]],
  "Esther": [10, [
    22, 23, 15, 17, 14, 14, 10, 17, 32, 3
  ]],
  "Job": [42, [
    22, 13, 26, 21, 27, 30, 21, 22, 35, 22,
    20, 25, 28, 22, 35, 22, 16, 21, 29, 29,
    34, 30, 17, 25, 6, 14, 23, 28, 25, 31,
    40, 22, 33, 37, 16, 33, 24, 41, 30, 32,
    26, 17
  ]],
  "Psalms": [150, [
    6, 12, 8, 9, 6, 7, 5, 12, 11, 9,
    13, 6, 7, 5, 11, 15, 5, 51, 15, 10,
    14, 32, 6, 10, 22, 12, 14, 9, 11, 13,
    25, 11, 22, 23, 28, 13, 40, 23, 14, 18,
    14, 12, 5, 27, 18, 12, 10, 15, 21, 23,
    21, 11, 7, 9, 24, 14, 12, 12, 18, 14,
    9, 13, 12, 11, 13, 22, 11, 12, 13, 7,
    20, 35, 36, 5, 24, 20, 28, 23, 10, 12,
    21, 36, 12, 14, 21, 23, 11, 13, 21, 72,
    13, 20, 17, 8, 19, 13, 14, 17, 7, 19,
    53, 17, 16, 16, 5, 23, 11, 13, 12, 9,
    9, 5, 8, 29, 22, 35, 45, 48, 43, 14,
    31, 7, 10, 10, 9, 8, 18, 19, 2, 29,
    176, 7, 8, 9, 4, 8, 5, 6, 5, 6,
    8, 8, 3, 18, 3, 3, 21, 26, 9, 8,
    24, 13, 10, 7, 12, 15, 21, 10, 20, 14,
    9, 6
  ]],
  "Proverbs": [31, [
    33, 22, 35, 27, 23, 35, 27, 36, 18, 32,
    31, 28, 25, 35, 33, 33, 28, 24, 29, 30,
    31, 29, 35, 34, 28, 28, 27, 28, 27, 33,
    31
  ]],
  "Ecclesiastes": [12, [
    18, 26, 22, 17, 19, 12, 29, 17, 18, 20,
    10, 14
  ]],
  "Song of Solomon": [8, [
    17, 17, 11, 16, 16, 13, 13, 14
  ]],
  "Isaiah": [66, [
    31, 22, 26, 6, 30, 13, 25, 22, 21, 34,
    16, 6, 22, 32, 9, 14, 14, 7, 25, 6,
    17, 25, 18, 23, 12, 21, 13, 29, 24, 33,
    9, 20, 24, 17, 10, 22, 38, 22, 8, 31,
    29, 25, 28, 28, 13, 15, 22, 26, 11, 23,
    15, 12, 17, 13, 12, 21, 14, 21, 22, 11,
    12, 19, 12, 25, 24
  ]],
  "Jeremiah": [52, [
    19, 37, 25, 31, 31, 30, 34, 22, 26, 25,
    23, 17, 27, 22, 21, 21, 27, 23, 15, 18,
    14, 30, 40, 10, 38, 24, 22, 17, 32, 24,
    40, 44, 26, 22, 19, 32, 21, 28, 18, 16,
    18, 22, 13, 30, 5, 28, 7, 47, 39, 46,
    64, 34
  ]],
  "Lamentations": [5, [
    22, 22, 66, 22, 22
  ]],
  "Ezekiel": [48, [
    28, 10, 27, 17, 17, 14, 27, 18, 11, 22,
    25, 28, 23, 23, 8, 63, 24, 32, 14, 49,
    32, 31, 49, 27, 17, 21, 36, 26, 21, 26,
    18, 32, 33, 31, 15, 38, 28, 23, 29, 49,
    26, 20, 27, 31, 25, 24, 23, 35
  ]],
  "Daniel": [12, [
    21, 49, 30, 37, 31, 28, 28, 27, 27, 21,
    45, 13
  ]],
  "Hosea": [14, [
    11, 23, 5, 19, 15, 11, 16, 14, 17, 15,
    12, 14, 16, 9
  ]],
  "Joel": [3, [
    20, 32, 21
  ]],
  "Amos": [9, [
    15, 16, 15, 13, 27, 14, 17, 14, 15
  ]],
  "Obadiah": [1, [
    21
  ]],
  "Jonah": [4, [
    17, 10, 10, 11
  ]],
  "Micah": [7, [
    16, 13, 12, 13, 15, 16, 20
  ]],
  "Nahum": [3, [
    15, 13, 19
  ]],
  "Habakkuk": [3, [
    17, 20, 19
  ]],
  "Zephaniah": [3, [
    18, 15, 20
  ]],
  "Haggai": [2, [
    15, 23
  ]],
  "Zechariah": [14, [
    21, 13, 10, 14, 11, 15, 14, 23, 17, 12,
    17, 14, 9, 21
  ]],
  "Malachi": [4, [
    14, 17, 18, 6
  ]],
  "Matthew": [28, [
    25, 23, 17, 25, 48, 34, 29, 34, 38, 42,
    30, 50, 58, 36, 39, 28, 27, 35, 30, 34,
    46, 46, 39, 51, 46, 75, 66, 20
  ]],
  "Mark": [16, [
    45, 28, 35, 41, 43, 56, 37, 38, 50, 52,
    33, 44, 37, 72, 47, 20
  ]],
  "Luke": [24, [
    80, 52, 38, 44, 39, 49, 50, 56, 62, 42,
    54, 59, 35, 35, 32, 31, 37, 43, 48, 47,
    38, 71, 56, 53
  ]],
  "John": [21, [
    51, 25, 36, 54, 47, 71, 53, 59, 41, 42,
    57, 50, 38, 31, 27, 33, 26, 40, 42, 31,
    25
  ]],
  "Acts": [28, [
    26, 47, 26, 37, 42, 15, 60, 40, 43, 48,
    30, 25, 52, 28, 41, 40, 34, 28, 41, 38,
    40, 30, 35, 27, 27, 32, 44, 31
  ]],
  "Romans": [16, [
    32, 29, 31, 25, 21, 23, 25, 39, 33, 21,
    36, 21, 14, 23, 33, 27
  ]],
  "1 Corinthians": [16, [
    31, 16, 23, 21, 13, 20, 40, 13, 27, 33,
    34, 31, 13, 40, 58, 24
  ]],
  "2 Corinthians": [13, [
    24, 17, 18, 18, 21, 22, 16, 15, 15, 18,
    33, 21, 14
  ]],
  "Galatians": [6, [
    24, 21, 29, 31, 26, 18
  ]],
  "Ephesians": [6, [
    23, 22, 21, 32, 33, 24
  ]],
  "Philippians": [4, [
    30, 30, 21, 23
  ]],
  "Colossians": [4, [
    29, 23, 25, 18
  ]],
  "1 Thessalonians": [5, [
    10, 20, 13, 18, 28
  ]],
  "2 Thessalonians": [3, [
    12, 17, 18
  ]],
  "1 Timothy": [6, [
    20, 15, 16, 16, 25, 21
  ]],
  "2 Timothy": [4, [
    18, 26, 17, 22
  ]],
  "Titus": [3, [
    16, 15, 15
  ]],
  "Philemon": [1, [
    25
  ]],
  "Hebrews": [13, [
    14, 18, 19, 16, 14, 20, 28, 13, 39, 40,
    29, 25, 25
  ]],
  "James": [5, [
    27, 26, 18, 17, 20
  ]],
  "1 Peter": [5, [
    25, 25, 22, 19, 14
  ]],
  "2 Peter": [3, [
    21, 22, 18
  ]],
  "1 John": [5, [
    10, 29, 24, 21, 21
  ]],
  "2 John": [1, [
    13
  ]],
  "3 John": [1, [
    14
  ]],
  "Jude": [1, [
    25
  ]],
  "Revelation": [22, [
    20, 29, 22, 11, 14, 17, 17, 13, 21, 11,
    19, 18, 18, 20, 8, 21, 18, 24, 21, 15,
    27, 21
  ]]
};

const DutchBibleBooksNBV = {
  "Genesis": [50, [
    31, 25, 24, 26, 32, 22, 24, 22, 29, 32,
    32, 20, 18, 24, 21, 16, 27, 33, 38, 18,
    34, 24, 20, 67, 34, 35, 46, 22, 35, 43,
    55, 32, 20, 31, 29, 43, 36, 30, 23, 23,
    57, 38, 34, 34, 28, 34, 31, 22, 33, 26
  ]],
  "Exodus": [40, [
    22, 25, 22, 31, 23, 30, 25, 32, 35, 29,
    10, 51, 22, 31, 27, 36, 16, 27, 25, 26,
    36, 31, 33, 18, 40, 37, 21, 43, 46, 38,
    18, 35, 23, 35, 35, 38, 29, 31, 43, 38
  ]],
  "Leviticus": [27, [
    17, 16, 17, 35, 26, 23, 38, 36, 24, 20,
    47, 8, 59, 57, 33, 34, 16, 30, 37, 27,
    24, 33, 44, 23, 55, 46, 34
  ]],
  "Numeri": [36, [
    54, 34, 51, 49, 31, 27, 89, 26, 23, 36,
    35, 16, 33, 45, 41, 50, 13, 32, 22, 29,
    35, 41, 30, 25, 18, 65, 23, 31, 39, 17,
    54, 42, 56, 29, 34, 13
  ]],
  "Deuteronomium": [34, [
    46, 37, 29, 49, 33, 25, 26, 20, 29, 22,
    32, 32, 18, 29, 23, 22, 20, 22, 21, 20,
    23, 30, 25, 22, 19, 19, 26, 68, 29, 20,
    30, 52, 29, 12
  ]],
  "Jozua": [24, [
    18, 24, 17, 24, 15, 27, 26, 35, 27, 43,
    23, 24, 33, 15, 63, 10, 18, 28, 51, 9,
    45, 34, 16, 33
  ]],
  "Rechters": [21, [
    36, 23, 31, 24, 31, 40, 25, 35, 57, 18,
    40, 15, 25, 20, 20, 31, 13, 31, 30, 48,
    25
  ]],
  "Ruth": [4, [
    22, 23, 18, 22
  ]],
  "1 Samuël": [31, [
    28, 36, 21, 22, 12, 21, 17, 22, 27, 27,
    15, 25, 23, 52, 35, 23, 58, 30, 24, 42,
    16, 23, 28, 23, 44, 25, 12, 25, 11, 31,
    13
  ]],
  "2 Samuël": [24, [
    27, 32, 39, 12, 25, 23, 29, 18, 13, 19,
    27, 31, 39, 33, 37, 23, 29, 33, 43, 26,
    22, 51, 39, 25
  ]],
  "1 Koningen": [22, [
    53, 46, 28, 34, 18, 38, 51, 66, 28, 29,
    43, 33, 34, 31, 34, 34, 24, 46, 21, 43,
    29, 54
  ]],
  "2 Koningen": [25, [
    18, 25, 27, 44, 27, 33, 20, 29, 37, 36,
    21, 21, 25, 29, 38, 20, 41, 37, 37, 21,
    26, 20, 37, 20, 30
  ]],
  "1 Kronieken": [29, [
    54, 55, 24, 43, 41, 66, 40, 40, 44, 14,
    47, 40, 14, 17, 29, 43, 27, 17, 19, 8,
    30, 19, 32, 31, 31, 32, 34, 21, 30
  ]],
  "2 Kronieken": [36, [
    17, 18, 17, 22, 14, 42, 22, 18, 31, 19,
    23, 16, 22, 15, 19, 14, 19, 34, 11, 37,
    20, 12, 21, 27, 28, 23, 9, 27, 36, 27,
    21, 33, 25, 31, 27, 23
  ]],
  "Ezra": [10, [
    11, 70, 13, 24, 17, 22, 28, 36, 15, 44
  ]],
  "Nehemia": [13, [
    11, 20, 32, 23, 19, 19, 73, 18, 38, 39,
    36, 47, 31
  ]],
  "Ester": [10, [
    22, 23, 15, 17, 14, 14, 10, 17, 32, 3
  ]],
  "Job": [42, [
    22, 13, 26, 21, 27, 30, 21, 22, 35, 22,
    20, 25, 28, 22, 35, 22, 16, 21, 29, 29,
    34, 30, 17, 25, 6, 14, 23, 28, 25, 31,
    40, 22, 33, 37, 16, 33, 24, 41, 30, 32,
    26, 17
  ]],
  "Psalmen": [150, [
    6, 12, 8, 9, 6, 7, 5, 12, 11, 9,
    13, 6, 7, 5, 11, 15, 5, 51, 15, 10,
    14, 32, 6, 10, 22, 12, 14, 9, 11, 13,
    25, 11, 22, 23, 28, 13, 40, 23, 14, 18,
    14, 12, 5, 27, 18, 12, 10, 15, 21, 23,
    21, 11, 7, 9, 24, 14, 12, 12, 18, 14,
    9, 13, 12, 11, 13, 22, 11, 12, 13, 7,
    20, 35, 36, 5, 24, 20, 28, 23, 10, 12,
    21, 36, 12, 14, 21, 23, 11, 13, 21, 72,
    13, 20, 28, 23, 10, 15, 11, 21, 11, 15,
    14, 16, 10, 10, 11, 13, 10, 11, 10, 20,
    13, 20, 15, 9, 15, 21, 27, 26, 17, 23,
    16, 23, 29, 17, 24, 21, 7, 10, 10, 9,
    20, 11, 8, 15, 22, 8, 9, 14, 15, 23,
    11, 11, 20, 22, 21, 12, 16, 11, 16, 9,
    17, 19, 9, 6, 14, 8, 13, 11, 9, 6
  ]],
  "Spreuken": [31, [
    33, 22, 35, 27, 23, 35, 27, 36, 18, 32,
    31, 28, 25, 35, 33, 33, 28, 24, 29, 30,
    31, 29, 35, 34, 28, 27, 28, 27, 30, 33,
    31
  ]],
  "Prediker": [12, [
    18, 26, 22, 16, 20, 12, 29, 17, 18, 20,
    10, 14
  ]],
  "Hooglied": [8, [
    17, 17, 11, 16, 16, 13, 13, 14
  ]],
  "Jesaja": [66, [
    31, 22, 26, 6, 30, 13, 25, 22, 21, 34,
    16, 6, 22, 32, 9, 14, 14, 7, 25, 6,
    17, 25, 18, 23, 12, 21, 13, 29, 24, 33,
    9, 20, 24, 17, 10, 22, 38, 22, 8, 31,
    29, 25, 28, 28, 25, 13, 15, 22, 26, 11,
    23, 15, 12, 17, 13, 12, 21, 14, 21, 22,
    11, 12, 19, 11, 25, 24
  ]],
  "Jeremia": [52, [
    19, 37, 25, 31, 31, 30, 34, 23, 25, 25,
    23, 17, 27, 22, 21, 21, 27, 23, 15, 18,
    14, 30, 40, 10, 38, 24, 22, 17, 32, 24,
    40, 44, 26, 22, 19, 32, 21, 28, 18, 16,
    18, 22, 13, 30, 5, 28, 7, 47, 39, 46,
    64, 34
  ]],
  "Klaagliederen": [5, [
    22, 22, 66, 22, 22
  ]],
  "Ezechiël": [48, [
    28, 10, 27, 17, 17, 14, 27, 18, 11, 22,
    25, 28, 23, 23, 8, 63, 24, 32, 14, 49,
    32, 31, 49, 27, 17, 21, 36, 26, 21, 26,
    18, 32, 33, 31, 15, 38, 28, 23, 29, 49,
    26, 20, 27, 31, 25, 24, 23, 35
  ]],
  "Daniël": [12, [
    21, 49, 33, 34, 31, 28, 28, 27, 27, 21,
    45, 13
  ]],
  "Hosea": [14, [
    11, 23, 5, 19, 15, 11, 16, 14, 17, 15,
    12, 15, 14, 9
  ]],
  "Joël": [4, [
    20, 27, 5, 21
  ]],
  "Amos": [9, [
    15, 16, 15, 13, 27, 14, 17, 14, 15
  ]],
  "Obadja": [1, [
    21
  ]],
  "Jona": [4, [
    16, 11, 10, 11
  ]],
  "Micha": [7, [
    16, 13, 12, 14, 14, 16, 20
  ]],
  "Nahum": [3, [
    15, 13, 19
  ]],
  "Habakuk": [3, [
    17, 20, 19
  ]],
  "Sefanja": [3, [
    18, 15, 20
  ]],
  "Haggai": [2, [
    15, 23
  ]],
  "Zacharia": [14, [
    17, 17, 10, 14, 11, 15, 14, 23, 17, 12,
    17, 14, 9, 21
  ]],
  "Maleachi": [4, [
    14, 17, 24, 6
  ]],
  "Matteüs": [28, [
    25, 23, 17, 25, 48, 34, 29, 34, 38, 42,
    30, 50, 58, 36, 39, 28, 27, 35, 30, 34,
    46, 46, 39, 51, 46, 75, 66, 20
  ]],
  "Marcus": [16, [
    45, 28, 35, 41, 43, 56, 37, 38, 50, 52,
    33, 44, 37, 72, 47, 20
  ]],
  "Lucas": [24, [
    80, 52, 38, 44, 39, 49, 50, 56, 62, 42,
    54, 59, 35, 35, 32, 31, 37, 43, 48, 47,
    38, 71, 56, 53
  ]],
  "Johannes": [21, [
    51, 25, 36, 54, 47, 71, 53, 59, 41, 42,
    57, 50, 38, 31, 27, 33, 26, 40, 42, 31,
    25
  ]],
  "Handelingen": [28, [
    26, 47, 26, 37, 42, 15, 60, 40, 43, 48,
    30, 25, 52, 28, 41, 40, 34, 28, 41, 38,
    40, 30, 35, 27, 27, 32, 44, 31
  ]],
  "Romeinen": [16, [
    32, 29, 31, 25, 21, 23, 25, 39, 33, 21,
    36, 21, 14, 26, 33, 27
  ]],
  "1 Korintiërs": [16, [
    31, 16, 23, 21, 13, 20, 40, 13, 27, 33,
    34, 31, 13, 40, 58, 24
  ]],
  "2 Korintiërs": [13, [
    24, 17, 18, 18, 21, 18, 16, 24, 15, 18,
    33, 21, 14
  ]],
  "Galaten": [6, [
    24, 21, 29, 31, 26, 18
  ]],
  "Efeziërs": [6, [
    23, 22, 21, 32, 33, 24
  ]],
  "Filippenzen": [4, [
    30, 30, 21, 23
  ]],
  "Colossenzen": [4, [
    29, 23, 25, 18
  ]],
  "1 Tessalonicenzen": [5, [
    10, 20, 13, 18, 28
  ]],
  "2 Tessalonicenzen": [3, [
    12, 17, 18
  ]],
  "1 Timoteüs": [6, [
    20, 15, 16, 16, 25, 21
  ]],
  "2 Timoteüs": [4, [
    18, 26, 17, 22
  ]],
  "Titus": [3, [
    16, 15, 15
  ]],
  "Filemon": [1, [
    25
  ]],
  "Hebreeën": [13, [
    14, 18, 19, 16, 14, 20, 28, 13, 28, 39,
    40, 29, 25
  ]],
  "Jakobus": [5, [
    27, 26, 18, 17, 20
  ]],
  "1 Petrus": [5, [
    25, 25, 22, 19, 14
  ]],
  "2 Petrus": [3, [
    21, 22, 18
  ]],
  "1 Johannes": [5, [
    10, 29, 24, 21, 21
  ]],
  "2 Johannes": [1, [
    13
  ]],
  "3 Johannes": [1, [
    15
  ]],
  "Judas": [1, [
    25
  ]],
  "Openbaring": [22, [
    20, 29, 22, 11, 14, 17, 17, 13, 21, 11,
    19, 17, 18, 20, 8, 21, 18, 24, 21, 15,
    27, 21
  ]]
};

const getRandomBibleBook = () => {
  const books = Object.keys(EnglishbibleBooks);
  const randomIndex = Math.floor(Math.random() * books.length);
  return books[randomIndex];
};

const getRandomVerseRange = (book, chapter) => {
  const numChapters = EnglishbibleBooks[book][0];
  const numVerses = EnglishbibleBooks[book][1][chapter - 1];

  const fromVerse = Math.floor(Math.random() * numVerses) + 1;
  const toVerse = Math.min(fromVerse + 11, numVerses);

  return { fromVerse, toVerse };
};

const getRandomBibleBookNL = () => {
  const books = Object.keys(DutchBibleBooksNBV);
  const randomIndex = Math.floor(Math.random() * books.length);
  return randomIndex;
};

const getRandomChapterNL = (bookIndex) => {
  const bookName = Object.keys(DutchBibleBooksNBV)[bookIndex];
  const numChapters = DutchBibleBooksNBV[bookName][0];
  const randomChapter = Math.floor(Math.random() * numChapters) + 1;
  return randomChapter;
};

const getRandomVerseRangeNL = (bookIndex, chapter) => {
  const bookName = Object.keys(DutchBibleBooksNBV)[bookIndex];
  const numVerses = DutchBibleBooksNBV[bookName][1][chapter - 1];
  const randomVerse = Math.floor(Math.random() * (numVerses - 4)) + 1;
  const randomVerseRange = Array.from({ length: 5 }, (_, i) => randomVerse + i);
  return randomVerseRange;
};


const App = () => {
  const [bibleData, setBibleData] = useState('');
  const [bibleBook, setBibleBook] = useState('');
  const [bibleChapter, setBibleChapter] = useState('');
  const [bibleVerseFrom, setBibleVerseFrom] = useState('');
  const [bibleVerseTo, setBibleVerseTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("Daily Bible Verses")
  const [language, setLanguage] = useState('EN');
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; 
    const savedDate = localStorage.getItem('savedDate');

    if (savedDate === today) {
      setBibleData(localStorage.getItem('BibleData'));
      setBibleBook(localStorage.getItem('BibleBook'));
      setBibleChapter(localStorage.getItem('BibleChapter'));
      setBibleVerseFrom(localStorage.getItem('BibleVerseFrom'));
      setBibleVerseTo(localStorage.getItem('BibleVerseTo'));
    } else {
      fetchVerses(today);
    }
  }, []);

  useEffect(() => {
    language == 'EN' ? document.title = documentTitle : document.title = "Dagelijkse Bijbel Versen"
  }, [documentTitle, language])

  const fetchVerses = async (today) => {
    setLoading(true);
    const randomBook = getRandomBibleBook();
    const randomChapter = Math.floor(Math.random() * EnglishbibleBooks[randomBook][0]) + 1;
    const { fromVerse, toVerse } = getRandomVerseRange(randomBook, randomChapter);

    const options = {
      method: 'GET',
      url: 'https://ajith-holy-bible.p.rapidapi.com/GetVerses',
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com'
      },
      params: {
        Book: randomBook,
        Chapter: randomChapter.toString(),
        VerseFrom: fromVerse.toString(),
        VerseTo: toVerse.toString()
      }
    };

    try {
      const response = await axios.request(options);
      setBibleData(response.data.Output);
      setBibleBook(response.data.Book);
      setBibleChapter(response.data.Chapter);
      if(response.data.VerseFrom === response.data.VerseTo) {
        setBibleVerseFrom(response.data.VerseFrom);
        setBibleVerseTo('');
      } else {
        setBibleVerseFrom(response.data.VerseFrom);
      setBibleVerseTo(response.data.VerseTo);
      }

      localStorage.setItem(`BibleData`, response.data.Output);
      localStorage.setItem(`BibleBook`, response.data.Book);
      localStorage.setItem(`BibleChapter`, response.data.Chapter);
      localStorage.setItem(`BibleVerseFrom`, response.data.VerseFrom);
      localStorage.setItem(`BibleVerseTo`, response.data.VerseTo);
      localStorage.setItem('savedDate', today);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const FetchRandomVerse = async() => {
    setLoading(true);
    const randomBook = getRandomBibleBook();
    const randomChapter = Math.floor(Math.random() * EnglishbibleBooks[randomBook][0]) + 1;
    const { fromVerse, toVerse } = getRandomVerseRange(randomBook, randomChapter);

    const options = {
      method: 'GET',
      url: 'https://ajith-holy-bible.p.rapidapi.com/GetVerses',
      headers: {
        'x-rapidapi-key':  process.env.REACT_APP_API_KEY,
        'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com'
      },
      params: {
        Book: randomBook,
        Chapter: randomChapter.toString(),
        VerseFrom: fromVerse.toString(),
        VerseTo: toVerse.toString()
      }
    };

    try {
      const response = await axios.request(options);
      setBibleData(response.data.Output);
      setBibleBook(response.data.Book);
      setBibleChapter(response.data.Chapter);
      if(response.data.VerseFrom === response.data.VerseTo) {
        setBibleVerseFrom(response.data.VerseFrom);
        setBibleVerseTo('');
      } else {
        setBibleVerseFrom(response.data.VerseFrom);
      setBibleVerseTo(response.data.VerseTo);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  }

const DailyVerseClick = () => {
  setBibleData(localStorage.getItem(`BibleData`))
  setBibleBook(localStorage.getItem(`BibleBook`))
  setBibleChapter(localStorage.getItem(`BibleChapter`))
  setBibleVerseTo(localStorage.getItem(`BibleVerseTo`))
  setBibleVerseFrom(localStorage.getItem(`BibleVerseFrom`))
  setDocumentTitle("Daily Bible Verses")
}

const RandomVerseClick = () => {
  FetchRandomVerse();
  setDocumentTitle("Random Bible Verse")
}

  const DailyVerseClickNL = async () => {
    setLoading(true);
    setDocumentTitle("Dagelijkse Bijbel Versen");

    const book = localStorage.getItem("BibleBook");
    const ENbookIndex  = Object.keys(EnglishbibleBooks).indexOf(book);
    const chapter = localStorage.getItem("BibleChapter");
    const verseFrom = localStorage.getItem("BibleVerseFrom");
    const verseTo = localStorage.getItem("BibleVerseTo");

    const bookName = Object.keys(DutchBibleBooksNBV)[ENbookIndex];
    const targetURL = `https://cors-anywhere.herokuapp.com/https://online-bijbel.nl/api.php?b=${ENbookIndex + 1}&h=${chapter}&v=${verseFrom}-${verseTo}`;

    try {
      const response = await axios.get(targetURL);
      const data = response.data;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const versElements = xmlDoc.getElementsByTagName("vers");

      const verses = [];
      for (let i = 0; i < versElements.length; i++) {
        verses.push(versElements[i].textContent);
      }

      console.log(verses);
      setBibleData(verses.join(" "));
      setBibleBook(bookName);
      setBibleChapter(chapter);
      setBibleVerseFrom(verseFrom);
      setBibleVerseTo(verseTo);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  const RandomVerseClickNL = async () => {
    setLoading(true);
    setDocumentTitle("Willekeurige Bijbel Versen")
    const randomBookIndex = getRandomBibleBookNL();
    const randomBookName = Object.keys(DutchBibleBooksNBV)[randomBookIndex];
    const randomChapter = getRandomChapterNL(randomBookIndex);
    const randomVerseRange = getRandomVerseRangeNL(randomBookIndex, randomChapter);

    const targetURL = `https://cors-anywhere.herokuapp.com/https://online-bijbel.nl/api.php?b=${randomBookIndex + 1}&h=${randomChapter}&v=${randomVerseRange.join(',')}`;

    try {
      const response = await axios.get(targetURL);
      const data = response.data;

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const versElements = xmlDoc.getElementsByTagName('vers');

      const verses = [];
      for (let i = 0; i < versElements.length; i++) {
        verses.push(versElements[i].textContent);
      }

      console.log(verses);
      setBibleData(verses.join(' '));
      setBibleBook(randomBookName);
      setBibleChapter(randomChapter);
      setBibleVerseFrom(randomVerseRange[0]);
      setBibleVerseTo(randomVerseRange[randomVerseRange.length - 1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  
const handleLanguage = () => {
  language == "EN" ? setLanguage("NL") : setLanguage("EN");
}
const ButtonStyle = {
    borderRadius: '5px',
    backgroundColor: '#fff',
    border: '1px solid',
    padding: '8px 12px',
    margin: '8px',
    cursor: 'pointer',
    fontFamily: 'Poppins',
    fontWeight: '500',
    boxShadow: '0 2px 4px'
};

  const h2title = `${bibleBook} ${bibleChapter}`;
  const h3title = bibleVerseTo !== '' ? `${bibleVerseFrom}-${bibleVerseTo}` : `${bibleVerseFrom}`;

  // !!Important function // 

  const CheckingLanguagesDaily = () => {
    language == 'EN' ? DailyVerseClick() : DailyVerseClickNL();
  }
  const CheckingLanguagesRandom = () => {
    language == 'EN' ? RandomVerseClick() : RandomVerseClickNL();
  }
  // // 
  return (
    <>
      <div>
      <h1 className="DBV" style={{ fontFamily: "Poppins", fontWeight: "200", position: "fixed", left: "50%", transform: "translate(-50%, 60%)", userSelect: "none"}}>
        {documentTitle}
      </h1>

      </div>
      <div className="verse-container" style={{ top: "57.5%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute", width: "500px", maxHeight: "600px", height: "auto", wordWrap: "break-word", overflowY: "auto", marginBottom: "45px" }}>
        {loading ? (
          <p style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: "300", fontSize: "18px" }}>Loading...</p>
        ) : (
          <>
            <div style={{ display: "flex" }}>
              <h2 style={{ marginRight: "7px", fontFamily: "Poppins", fontWeight: "400" }}>{h2title}</h2>
              <h3 style={{ fontFamily: "Poppins", fontWeight: "300" }}>{h3title}</h3>
            </div>
            <p style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: "300", fontSize: "18px" }}>
              {bibleData}
            </p>
          </>
        )}
      </div>

            <div className="button-div" style={{position: "fixed", bottom: "15px", right: "15px"}}>
              <button id="button" style={ButtonStyle} onClick={CheckingLanguagesDaily}>Daily Verses</button>
              <button id="button" style={ButtonStyle} onClick={CheckingLanguagesRandom}> Random Verse</button>
            </div>

            <div className='button-div2' style={{position: "fixed", top: "15px", right: "15px"}}>
              <button style={ButtonStyle} onClick={handleLanguage}>{language == "EN" ? "EN" : "NL"}</button>
            </div>
    </>
  );
};

export default App;
