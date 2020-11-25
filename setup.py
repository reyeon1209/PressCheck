#!/usr/bin/env python
from setuptools import setup, find_packages
import presscheck

setup(
    name=presscheck.__name__,
    description=presscheck.__description__,
    version=presscheck.__version__,
    author=['Kyeongnam Kim', 'Jaeyeon Yang', "Yuchul Cho, Ki-in Han"],
    author_email=['devokkn@gmail.com', 'reyeon5368@naver.com', 'chldbcjf4321@naver.com', 'chris170841@gmail.com'],
    url=presscheck.__url__,
    install_requires=presscheck.__install_requires__,
    license=presscheck.__license__,
    long_description=open('./README.md', 'r', encoding='utf-8').read(),
    long_description_content_type="text/markdown",
    packages=find_packages(),
    classifiers=[
        'Programming Language :: Python :: 3',
    ]
)
