from fastapi import APIRouter, Depends, Query

from app.models.column import ColumnSummary
from app.models.relationship import RelationshipResult

from app.services.relationship_service import (
    get_relationship,
    get_relationship_columns,
)

from app.core.deps import get_current_user


router = APIRouter(
    prefix="/relationships",
    tags=["Relationship Analysis"],
)


@router.get(
    "/{dataset_id}/columns",
    response_model=list[ColumnSummary],
    summary="Get Relationship Columns",
)
async def get_columns(
    dataset_id: str,
    user_id: str = Depends(get_current_user),
) -> list[ColumnSummary]:
    """
    Returns the columns available for relationship analysis.
    """

    return get_relationship_columns(
        dataset_id=dataset_id,
        user_id=user_id,
    )


@router.get(
    "/{dataset_id}/analysis",
    response_model=RelationshipResult,
    summary="Analyze Column Relationship",
)
async def analyze_columns(
    dataset_id: str,
    column_a: str = Query(...),
    column_b: str = Query(...),
    user_id: str = Depends(get_current_user),
) -> RelationshipResult:
    """
    Analyze the relationship between two selected columns.
    """

    return get_relationship(
        dataset_id=dataset_id,
        column_a=column_a,
        column_b=column_b,
        user_id=user_id,
    )