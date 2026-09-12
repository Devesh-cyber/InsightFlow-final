from fastapi import UploadFile

from app.models.upload import UploadResponse
from app.services.processing_service import process_data


def upload_dataset(file: UploadFile, user_id: str) -> UploadResponse:
    ''' Uploads and process a dataset, returning a structures response '''

    session = process_data(file, user_id)

    return UploadResponse(
        status='success',
        message='Dataset uploaded successfully',
        dataset_id=session.dataset_id,
        filename=session.filename,
        rows=session.metadata.rows,
        columns=session.metadata.columns
    )