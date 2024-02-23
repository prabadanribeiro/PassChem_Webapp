class CustomHeaderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response["X-Frame-Options"] = "ALLOW-FROM http://localhost:8080"
        response["Content-Security-Policy"] = "frame-ancestors 'self' http://localhost:8080"
        return response