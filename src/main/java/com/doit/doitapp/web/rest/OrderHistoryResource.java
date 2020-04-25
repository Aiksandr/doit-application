package com.doit.doitapp.web.rest;

import com.doit.doitapp.domain.OrderHistory;
import com.doit.doitapp.service.OrderHistoryService;
import com.doit.doitapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.doit.doitapp.domain.OrderHistory}.
 */
@RestController
@RequestMapping("/api")
public class OrderHistoryResource {

    private final Logger log = LoggerFactory.getLogger(OrderHistoryResource.class);

    private static final String ENTITY_NAME = "orderHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrderHistoryService orderHistoryService;

    public OrderHistoryResource(OrderHistoryService orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
    }

    /**
     * {@code POST  /order-histories} : Create a new orderHistory.
     *
     * @param orderHistory the orderHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orderHistory, or with status {@code 400 (Bad Request)} if the orderHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/order-histories")
    public ResponseEntity<OrderHistory> createOrderHistory(@RequestBody OrderHistory orderHistory) throws URISyntaxException {
        log.debug("REST request to save OrderHistory : {}", orderHistory);
        if (orderHistory.getId() != null) {
            throw new BadRequestAlertException("A new orderHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderHistory result = orderHistoryService.save(orderHistory);
        return ResponseEntity.created(new URI("/api/order-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /order-histories} : Updates an existing orderHistory.
     *
     * @param orderHistory the orderHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderHistory,
     * or with status {@code 400 (Bad Request)} if the orderHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orderHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/order-histories")
    public ResponseEntity<OrderHistory> updateOrderHistory(@RequestBody OrderHistory orderHistory) throws URISyntaxException {
        log.debug("REST request to update OrderHistory : {}", orderHistory);
        if (orderHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderHistory result = orderHistoryService.save(orderHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orderHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /order-histories} : get all the orderHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderHistories in body.
     */
    @GetMapping("/order-histories")
    public List<OrderHistory> getAllOrderHistories() {
        log.debug("REST request to get all OrderHistories");
        return orderHistoryService.findAll();
    }

    /**
     * {@code GET  /order-histories/:id} : get the "id" orderHistory.
     *
     * @param id the id of the orderHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/order-histories/{id}")
    public ResponseEntity<OrderHistory> getOrderHistory(@PathVariable Long id) {
        log.debug("REST request to get OrderHistory : {}", id);
        Optional<OrderHistory> orderHistory = orderHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderHistory);
    }

    /**
     * {@code DELETE  /order-histories/:id} : delete the "id" orderHistory.
     *
     * @param id the id of the orderHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/order-histories/{id}")
    public ResponseEntity<Void> deleteOrderHistory(@PathVariable Long id) {
        log.debug("REST request to delete OrderHistory : {}", id);
        orderHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
