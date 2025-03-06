namespace Domain.Exceptions;

public class DomainValidationException(IEnumerable<string> errors) : Exception(string.Join(", ", errors))
{
}

public class EntityNotFoundException(string message) : Exception(message)
{
}
