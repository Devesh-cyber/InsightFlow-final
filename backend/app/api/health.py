from fastapi import APIRouter, Depends

from app.models.health import HealthResponse
from app.services.health_service import get_dataset_health
from app.core.deps import get_current_user


router = APIRouter(
    prefix='/health',
    tags=['Dataset Health']
)


@router.get(
    '/{dataset_id}',
    response_model=HealthResponse,
    summary='Get dataset Health Report'
)
def get_health(
    dataset_id: str,
    user_id: str = Depends(get_current_user)
):
    '''
    Returns the health report for an uploaded dataset
    '''

    return get_dataset_health(
        dataset_id=dataset_id,
        user_id=user_id
    )