from fastapi import FastAPI

from app.domains.catalog.router import router as catalog_router
from app.domains.identity.router import router as identity_router
from app.domains.order.router import router as order_router


app = FastAPI(
    title="Dolphin Lynxi API",
    description="Platform backend skeleton for identity, order, user, and channel domains.",
    version="0.1.0",
)

app.include_router(identity_router)
app.include_router(catalog_router)
app.include_router(order_router)


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/system/architecture")
def architecture() -> dict[str, object]:
    return {
        "frontend": {
            "marketing": "static-html",
            "platform_shell": "nextjs",
            "language": "typescript",
        },
        "backend": {
            "framework": "fastapi",
            "language": "python",
            "mode": "modular-monolith",
        },
        "planned_domains": ["identity", "catalog", "order", "user", "channel"],
        "ready_domains": ["identity", "catalog", "order"],
    }