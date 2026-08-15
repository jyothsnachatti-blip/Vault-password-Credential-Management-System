package com.securevault.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vault_shares")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VaultShare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vault_entry_id", nullable = false)
    private VaultEntry vaultEntry;

    @ManyToOne
    @JoinColumn(name = "shared_with_user_id", nullable = false)
    private User sharedWithUser;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Permission permission;

    public enum Permission {
        VIEW,
        EDIT
    }
}