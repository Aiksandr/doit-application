package com.doit.doitapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

import com.doit.doitapp.domain.enumeration.OrderStatus;

/**
 * A OrderHistory.
 */
@Entity
@Table(name = "order_history")
public class OrderHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "old_status")
    private OrderStatus oldStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_status")
    private OrderStatus newStatus;

    @Column(name = "create_date")
    private Instant createDate;

    @ManyToOne
    @JsonIgnoreProperties("orderHistories")
    private Order order;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderStatus getOldStatus() {
        return oldStatus;
    }

    public OrderHistory oldStatus(OrderStatus oldStatus) {
        this.oldStatus = oldStatus;
        return this;
    }

    public void setOldStatus(OrderStatus oldStatus) {
        this.oldStatus = oldStatus;
    }

    public OrderStatus getNewStatus() {
        return newStatus;
    }

    public OrderHistory newStatus(OrderStatus newStatus) {
        this.newStatus = newStatus;
        return this;
    }

    public void setNewStatus(OrderStatus newStatus) {
        this.newStatus = newStatus;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public OrderHistory createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Order getOrder() {
        return order;
    }

    public OrderHistory order(Order order) {
        this.order = order;
        return this;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderHistory)) {
            return false;
        }
        return id != null && id.equals(((OrderHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrderHistory{" +
            "id=" + getId() +
            ", oldStatus='" + getOldStatus() + "'" +
            ", newStatus='" + getNewStatus() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            "}";
    }
}
