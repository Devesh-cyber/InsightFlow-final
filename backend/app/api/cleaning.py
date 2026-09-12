from fastapi import APIRouter, Depends

from app.models.cleaning import (
    CleaningRecommendationsResponse,
    CleaningPreviewResponse,
    CleaningRequest,
    CleaningResponse,
    CleaningHistoryResponse,
)

from app.services.cleaning_service import (
    apply_cleaning,
    preview_cleaning,
    get_cleaning_recommendations,
    get_cleaning_history,
)

from app.core.deps import get_current_user


router = APIRouter(
    prefix="/cleaning",
    tags=["Data Cleaning"],
)


@router.get(
    "/{dataset_id}/recommendations",
    response_model=CleaningRecommendationsResponse,
    summary="Get Cleaning Recommendations",
)
async def cleaning_recommendations(
    dataset_id: str,
    user_id: str = Depends(get_current_user),
) -> CleaningRecommendationsResponse:
    """
    Analyze the dataset and return evidence-based
    cleaning recommendations.

    This endpoint does not modify the dataset.
    """

    return get_cleaning_recommendations(
        dataset_id=dataset_id,
        user_id=user_id,
    )


@router.post(
    "/{dataset_id}/preview",
    response_model=CleaningPreviewResponse,
    summary="Preview Cleaning Operation",
)
async def preview_dataset_cleaning(
    dataset_id: str,
    request: CleaningRequest,
    user_id: str = Depends(get_current_user),
) -> CleaningPreviewResponse:
    """
    Preview a user-selected cleaning operation
    without modifying the dataset.
    """

    return preview_cleaning(
        dataset_id=dataset_id,
        request=request,
        user_id=user_id,
    )


@router.post(
    "/{dataset_id}",
    response_model=CleaningResponse,
    summary="Apply Cleaning Operation",
)
async def clean_dataset(
    dataset_id: str,
    request: CleaningRequest,
    user_id: str = Depends(get_current_user),
) -> CleaningResponse:
    """
    Apply a user-selected cleaning operation
    to the dataset.
    """

    return apply_cleaning(
        dataset_id=dataset_id,
        request=request,
        user_id=user_id,
    )


@router.get(
    "/{dataset_id}/history",
    response_model=CleaningHistoryResponse,
    summary="Get Cleaning History",
)
async def cleaning_history(
    dataset_id: str,
    user_id: str = Depends(get_current_user),
) -> CleaningHistoryResponse:

    return get_cleaning_history(
        dataset_id=dataset_id,
        user_id=user_id,
    )