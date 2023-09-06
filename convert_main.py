
from pdf2docx import Converter

def convert_pdf_to_docx(input_pdf, output_docx):
    cv = Converter(input_pdf)
    cv.convert(output_docx, start=0, end=None)
    cv.close()

input_pdf = './resources/test.pdf'
output_docx = './resources/output.docx'

convert_pdf_to_docx(input_pdf, output_docx)