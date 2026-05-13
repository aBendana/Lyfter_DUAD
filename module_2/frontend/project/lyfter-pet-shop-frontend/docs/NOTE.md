> [!NOTE]
>
> ## Backend Extensions for Frontend Integration
>
> Several backend modules were extended **beyond the original module requirements** to fully support the frontend functionality.

> ### Changes Made

> | **Product Search** | Added ORM query for name-based partial matching, enabling `GET /products/search?column=name&value={term}` — used on the Products and Product Detail pages. |

> | **Response Payloads** | Enriched existing endpoint responses with additional fields required to correctly render certain UI sections. |

> | **Repository Layer** | Updated repository modules to reflect the above changes. |
>
> ### Modified Files
>
> ```
> app/infrastructure/cache/cache_redis_connection.py
> app/infrastructure/database/db_connection.py
> app/repositories/repository_invoice_details.py
> app/repositories/repository_products.py
> app/repositories/repository_products_in_cart.py
> app/routes/api_login.py
> app/routes/api_products.py
> app/utils/cache_manager.py
> app/utils/orms_queries.py
> ```
