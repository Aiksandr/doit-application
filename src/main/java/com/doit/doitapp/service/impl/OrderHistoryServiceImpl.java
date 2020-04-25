package com.doit.doitapp.service.impl;

import com.doit.doitapp.service.OrderHistoryService;
import com.doit.doitapp.domain.OrderHistory;
import com.doit.doitapp.repository.OrderHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link OrderHistory}.
 */
@Service
@Transactional
public class OrderHistoryServiceImpl implements OrderHistoryService {

    private final Logger log = LoggerFactory.getLogger(OrderHistoryServiceImpl.class);

    private final OrderHistoryRepository orderHistoryRepository;

    public OrderHistoryServiceImpl(OrderHistoryRepository orderHistoryRepository) {
        this.orderHistoryRepository = orderHistoryRepository;
    }

    /**
     * Save a orderHistory.
     *
     * @param orderHistory the entity to save.
     * @return the persisted entity.
     */
    @Override
    public OrderHistory save(OrderHistory orderHistory) {
        log.debug("Request to save OrderHistory : {}", orderHistory);
        return orderHistoryRepository.save(orderHistory);
    }

    /**
     * Get all the orderHistories.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderHistory> findAll() {
        log.debug("Request to get all OrderHistories");
        return orderHistoryRepository.findAll();
    }

    /**
     * Get one orderHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<OrderHistory> findOne(Long id) {
        log.debug("Request to get OrderHistory : {}", id);
        return orderHistoryRepository.findById(id);
    }

    /**
     * Delete the orderHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderHistory : {}", id);
        orderHistoryRepository.deleteById(id);
    }
}
