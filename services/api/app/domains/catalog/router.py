from fastapi import APIRouter

router = APIRouter(prefix="/catalog", tags=["catalog"])


@router.get("/health")
def catalog_health() -> dict[str, str]:
    return {"domain": "catalog", "status": "ok"}


@router.get("/services")
def list_services() -> dict[str, object]:
    # Mirrors current marketing homepage service sections.
    return {
        "items": [
            {"id": "svc-01", "name": "大规模数据集", "slug": "datasets"},
            {"id": "svc-02", "name": "具身智能数据工具链", "slug": "toolchain"},
            {"id": "svc-03", "name": "一键式采集预训练平台", "slug": "platform"},
            {"id": "svc-04", "name": "开发者中心", "slug": "developers"},
        ]
    }
