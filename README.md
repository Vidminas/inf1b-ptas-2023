# Set Them Free! Open Publishing of INF1B Course Materials
A Principal's Teaching Award Scheme small grant funded project, University of Edinburgh
December 2022 - June 2023

Also featured in: "Practical approaches to freeing university material stockpiles"

## Prerequisites
1. [Python 3](https://www.python.org/).
2. A text editor or IDE capable of running Jupyter notebook files, e.g. [Visual Studio Code](https://code.visualstudio.com/).
3. A Chromium-based web browser, e.g. [Chrome](https://www.google.com/intl/en_uk/chrome/) or [Microsoft Edge](https://www.microsoft.com/en-us/edge/).


## Running Lighthouse automated benchmarks
1. Install dependencies

    a. Using conda, run `conda env create -f environment.yml`.
    
    b. Using pip, run `pip install -r requirements.txt`.

2. Open `lighthouse_sites.ipynb` in your text editor.
3. Copy the Excel workbook `Publishing sites.xlsx` into the same directory as the ipynb file, rename it to `Publishing sites test.xlsx` or similar, and add a temporary column to each worksheet listing publishing sites titled 'Lighthouse'. In the Framework Overview worksheet, create 2 new columns: one titled 'Lighthouse' and one titled 'Examples'.
4. The first cell in `lighthouse_sites.ipynb` defines some useful constants for the program that follows. If necessary, change constant values to match file locations on your machine.
5. Run all the cells in sequence. Watch out for any errors -- if there are any, resolve them before continuing and re-run the cells. The cell that runs lighthouse evaluations can take >2h to run, so beware. This will create JSON files caching the resulting scores, detailed HTML reports in the `lighthouse_reports/` subdirectory, and add formatted scores to the Excel spreadsheet in a the temporary new 'Lighthouse' column (this is done to not overwrite original results, so they can be compared side-by-side first).
6. Open `lighthouse_frameworks.ipynb` and run all the cells. This will used the cached JSON scores to compute median scores for each framework, composed from all of the individual sites.


## Producing visualization for the benchmarks
1. Open `visualisation.ipynb`.
2. Run all cells in sequence. The graph will be produced and shown in your editor.
