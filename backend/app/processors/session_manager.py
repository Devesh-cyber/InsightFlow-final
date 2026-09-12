from uuid import uuid4

import pandas as pd

from app.core.exceptions import DatasetNotFoundError
from app.models.dataset import (
    DatasetMetadata,
    DatasetSession
)


SESSION_CACHE: dict[str, DatasetSession] = {}


def create_session(
    filename: str,
    dataframe: pd.DataFrame,
    metadata: DatasetMetadata,
    user_id: str
) -> DatasetSession:
    dataset_id = str(uuid4())

    session = DatasetSession(
        dataset_id=dataset_id,
        user_id=user_id,
        filename=filename,
        dataframe=dataframe,
        metadata=metadata
    )

    SESSION_CACHE[dataset_id] = session

    return session


def get_session(dataset_id: str, user_id: str) -> DatasetSession:
    if dataset_id not in SESSION_CACHE:
        raise DatasetNotFoundError(dataset_id=dataset_id)

    session = SESSION_CACHE[dataset_id]

    if session.user_id != user_id:
        raise DatasetNotFoundError(dataset_id=dataset_id)

    return session


def delete_session(dataset_id: str, user_id: str) -> None:
    if dataset_id not in SESSION_CACHE:
        return

    session = SESSION_CACHE[dataset_id]

    if session.user_id != user_id:
        raise DatasetNotFoundError(dataset_id=dataset_id)

    SESSION_CACHE.pop(dataset_id, None)


def session_exists(dataset_id: str, user_id: str) -> bool:
    if dataset_id not in SESSION_CACHE:
        return False

    return SESSION_CACHE[dataset_id].user_id == user_id