from fastapi import APIRouter, Depends, File, UploadFile

from app.models.upload import UploadResponse
from app.services.upload_service import upload_dataset
from app.core.deps import get_current_user


router = APIRouter(
    prefix='/upload',
    tags=['Upload']
)


@router.post(
    '',
    response_model=UploadResponse,
    summary='Upload Dataset'
)
async def upload(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user)
) -> UploadResponse:
    ''' upload and process a dataset'''

    return upload_dataset(file, user_id)