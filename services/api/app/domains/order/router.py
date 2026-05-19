from fastapi import APIRouter

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("/health")
def order_health() -> dict[str, str]:
    return {"domain": "orders", "status": "ok"}


@router.get("/preview")
def order_preview() -> dict[str, object]:
    # Placeholder contract for upcoming order system.
    return {
        "status": "draft",
        "supported_flow": [
            "quote_request",
            "contract_sign",
            "delivery_acceptance",
            "invoice",
        ],
    }
