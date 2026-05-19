from fastapi import APIRouter

router = APIRouter(prefix="/identity", tags=["identity"])


@router.get("/health")
def identity_health() -> dict[str, str]:
    return {"domain": "identity", "status": "ok"}


@router.get("/me")
def current_user() -> dict[str, object]:
    # Placeholder until auth/token middleware is wired.
    return {
        "id": "anonymous",
        "name": "Guest",
        "roles": ["viewer"],
    }
