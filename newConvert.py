import sys
import os 
from pdf2docx import Converter
# from pdf2docx import parse
pdf_path = sys.argv[1]


outpu_path = os.path.splitext(pdf_path)[0]+ '.docx'

converter = Converter(pdf_path)
converter.convert(outpu_path, parse_stream_table=False,
    max_border_width=0,
    min_svg_gap_dx=16, 
    min_svg_gap_dy=0)
converter.close()

# parse(pdf_path, outpu_path)

print("转换完成")