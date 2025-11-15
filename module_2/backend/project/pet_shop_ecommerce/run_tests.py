import subprocess
import sys
from datetime import datetime

def run_tests():
    """Execute all unit tests and generate a report"""
    print("=" * 70)
    print(f"TEST EXECUTION STARTED - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    
    # Run pytest with coverage and verbose output
    result = subprocess.run([
        'pytest',
        'tests/',
        '-v',                          # Verbose
        '--tb=short',                  # Short traceback
        '--cov=app',                   # Coverage for app folder
        '--cov-report=term-missing',   # Show missing lines
        '--cov-report=html',           # Generate HTML report
        '--junit-xml=test-results.xml' # Generate XML report
    ], capture_output=True, text=True)
    
    # Print output
    print(result.stdout)
    if result.stderr:
        print("ERRORS:", result.stderr)
    
    print("\n" + "=" * 70)
    print("TEST SUMMARY")
    print("=" * 70)
    
    if result.returncode == 0:
        print("✓ ALL TESTS PASSED")
    else:
        print("✗ SOME TESTS FAILED")
    
    print(f"\nDetailed HTML report: htmlcov/index.html")
    print(f"XML report: test-results.xml")
    print("=" * 70)
    
    return result.returncode

if __name__ == "__main__":
    exit_code = run_tests()
    sys.exit(exit_code)