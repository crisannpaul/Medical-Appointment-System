package mwcd.lhm.backend.service;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(Class<?> type, Object id) {
        super(type.getSimpleName() + " with id=" + id + " not found");
    }
}
