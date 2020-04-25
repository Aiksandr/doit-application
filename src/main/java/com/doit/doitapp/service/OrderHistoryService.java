package com.doit.doitapp.service;

import com.doit.doitapp.domain.OrderHistory;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link OrderHistory}.
 */
public interface OrderHistoryService {

    /**
     * Save a orderHistory.
     *
     * @param orderHistory the entity to save.
     * @return the persisted entity.
     */
    OrderHistory save(OrderHistory orderHistory);

    /**
     * Get all the orderHistories.
     *
     * @return the list of entities.
     */
    List<OrderHistory> findAll();

    /**
     * Get the "id" orderHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrderHistory> findOne(Long id);

    /**
     * Delete the "id" orderHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
