"""Upload endpoints for sales datasets."""

from collections.abc import Sequence
from io import BytesIO
from typing import Annotated

import pandas as pd
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

ALLOWED_CONTENT_TYPES = {
    "text/csv": "csv",
    "application/vnd.ms-excel": "excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "excel",
}

router = APIRouter()


def read_uploaded_file(upload: UploadFile) -> pd.DataFrame:
    """Parse an uploaded CSV or Excel file into a DataFrame."""

    content_type = upload.content_type or ""
    if content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Unsupported file type. Please upload a CSV or Excel file.",
        )

    try:
        file_bytes = upload.file.read()
        buffer = BytesIO(file_bytes)
        if ALLOWED_CONTENT_TYPES[content_type] == "csv":
            return pd.read_csv(buffer)
        return pd.read_excel(buffer)
    except Exception as exc:  # pragma: no cover - pandas raises varying exceptions.
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to parse file: {exc}",
        ) from exc


@router.post("", summary="Upload historical sales data")
async def upload_sales_history(
    file: Annotated[UploadFile, File(...)],
    _: str | None = Depends(lambda: None),  # Reserved for tenant auth injection
) -> dict[str, object]:
    """Accept a CSV/XLSX upload, perform basic validation, and return dataset stats."""

    dataframe = read_uploaded_file(file)

    required_columns = {"date", "sku", "units_sold"}
    missing_columns = required_columns - {column.lower() for column in dataframe.columns}
    if missing_columns:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Missing required columns: {', '.join(sorted(missing_columns))}",
        )

    sample_rows = dataframe.head(5).to_dict(orient="records")
    column_summary: Sequence[dict[str, object]] = [
        {"name": column, "dtype": str(dataframe[column].dtype)}
        for column in dataframe.columns
    ]

    return {
        "message": "File processed successfully.",
        "rows": len(dataframe),
        "columns": list(dataframe.columns),
        "column_summary": column_summary,
        "sample": sample_rows,
    }


